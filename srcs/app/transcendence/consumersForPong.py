from typing import List

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.exceptions import StopConsumer
from transcendence.models import Party, CustomUser
from transcendence.models import Game  as GameModel
from asgiref.sync import sync_to_async

import asyncio
import random


WIN_SCORE = 5

@sync_to_async
def updateParty(party_id, player1, player2):
    try:
        if player1.disconnected == True:
            player1.score = 0
            player2.score = WIN_SCORE
        elif player2.disconnected == True:
            player1.score = WIN_SCORE
            player2.score = 0
        user1 = CustomUser.objects.get(username=player1.username)
        party = Party.objects.get(id=party_id)
        if party.player1 == user1:
            party.score1 = player1.score
            party.score2 = player2.score
        else:
            party.score1 = player2.score
            party.score2 = player1.score
        party.save()
        party.update_end()

        tournament_id = party.tournament.id if party.tournament else None
        if tournament_id and party.partyintournament.round_nb == party.tournament.nb_round:
            tournament_status = "finished"
        else:
            tournament_status = "playing"
        return {'type': party.type, 
                'id': tournament_id,
                'status': tournament_status}
    except Exception as e:
        return {'type': 'error', 'id': None, 'status': 'error'}
    

# -----------------------------Classes--------------------------------
class Player():
    def __init__(self, username, side, websocket):
        self.username: str = username
        self.position: float = 0
        self.score: int = 0
        self.memScore: int = 0
        self.side: str = side
        self.socket: AsyncWebsocketConsumer = websocket
        self.disconnected: bool = False

class Ball():
    def __init__(self):
        self.position = {'x': 0, 'z': 0}
        self.direction = {'x': 0, 'z': 0}
        self.size = 0.4

    def ifPlayerHitted(self, playerPos: float):
        topLeft = {'x': playerPos['x'] - 0.5 - self.size,
                   'z': playerPos['z'] - 1 - self.size}
        botRight = {'x': playerPos['x'] + 0.5 + self.size,
                    'z': playerPos['z'] + 1 + self.size}
        if self.position['x'] >= topLeft['x'] and self.position['x'] <= botRight['x']:
            if self.position['z'] >= topLeft['z'] and self.position['z'] <= botRight['z']:
                self.direction['x'] = self.position['x'] - playerPos['x']
                self.direction['z'] = self.position['z'] - playerPos['z']
                maxVal = max(abs(self.direction['x']), abs(self.direction['z']))
                if maxVal != 0:
                    self.direction['x'] /= maxVal
                    self.direction['z'] /= maxVal

    def isBallLeftSide(self):
        return self.position['x'] < 0
    
    def isBallRightSide(self):
        return self.position['x'] > 0

    def isStoped(self):
        return (self.direction['x'] > 0 and self.direction['x'] < 0.5) or (self.direction['x'] < 0 and self.direction['x'] > -0.5) or (self.position['x'] != 0 and self.direction['x'] == 0)

    def ifTopBotHitted(self):
        if self.position['z'] >= 10 - self.size or self.position['z'] <= -10 + self.size:
            self.direction['z'] *= -1
            
    def ifScored(self, players: dict[str, Player]):
        if self.position['x'] >= 10 or self.position['x'] <= -10:
            if self.position['x'] >= 10:
                players['left'].score += 1
            else:
                players['right'].score += 1
            self.reset()

    def antiBlock(self):
        if self.isStoped():
            if self.isBallLeftSide():
                self.direction['x'] += 0.1
            if self.isBallRightSide():
                self.direction['x'] -= 0.1

    def move(self, players: dict[str, Player]):
        if self.direction['x'] == 0:
            self.reset()
        else:
            self.ifPlayerHitted({ 'z': players['left'].position, 'x': -9 })
            self.ifPlayerHitted({ 'z': players['right'].position, 'x': 9 })
            self.ifTopBotHitted()
            self.antiBlock()
            self.ifScored(players)
            self.position['x'] += self.direction['x'] / 10
            self.position['z'] += self.direction['z'] / 10
        
    def reset(self):
        self.position = {'x': 0, 'z': 0}
        self.direction = {'x': random.choice([-1, 1]), 'z': 0}

class Duo():
    def __init__(self, id, party_id):
        self.id: str = id
        self.isLeftAdded: bool = False
        self.players: List[Player] = []
        self.ball: Ball = Ball()
        self.activated: bool = False
        self.isFinished: bool = False
        self.party_id: int = party_id
        
    def append(self, player: Player):
        self.players.append(player)
        
    def remove(self, player: Player):
        self.players.remove(player)

    def getPlayer(self, username: str):
        for player in self.players:
            if player.username == username:
                return player
        return None
    
    def getPlayerLeft(self):
        for player in self.players:
            if player.side == 'left':
                return player
        return None
    
    def getPlayerRight(self):
        for player in self.players:
            if player.side == 'right':
                return player
        return None
    
    def getOtherPlayer(self, username: str):
        for player in self.players:
            if player.username != username:
                return player
        return None
    
    def isScoreChanged(self):
        playerLeft = self.getPlayerLeft()
        playerRight = self.getPlayerRight()
        if playerLeft == None or playerRight == None:
            return True
        if playerLeft.score != playerLeft.memScore or playerRight.score != playerRight.memScore:
            playerLeft.memScore = playerLeft.score
            playerRight.memScore = playerRight.score
            return True
        return False
    
    def getScoreString(self):
        playerLeft = self.getPlayerLeft()
        playerRight = self.getPlayerRight()
        return str(playerLeft.score if playerLeft is not None else 0) + ' - ' + str(playerRight.score if playerRight is not None else 0)
        
    def isEnd(self):
        playerLeft = self.getPlayerLeft()
        playerRight = self.getPlayerRight()
        if playerLeft == None:
            playerRight.score = WIN_SCORE
            return True
        if playerRight == None:
            playerLeft.score = WIN_SCORE
            return True
        return playerLeft.score == WIN_SCORE or playerRight.score == WIN_SCORE

    def isSomeoneDisconected(self):
        for player in self.players:
            if player.disconnected == True:
                return True
        return False
    
    def getDisconectedPlayer(self):
        for player in self.players:
            if player.disconnected == True:
                return player
        return None

    async def broadcast(self, message: dict):
        for player in self.players:
            message["username"] = player.username
            try:
                await player.socket.send(json.dumps(message))
            except:
                player.disconnected = True

    async def gameLoop(self):
        while True:
            if self.isSomeoneDisconected() == True:
                dataParty = await updateParty(self.party_id, playerLeft, playerRight)
                disconnectedPlayer = self.getDisconectedPlayer()
                winner = self.getOtherPlayer(disconnectedPlayer.username)
                scoreString = "5 - 0" if winner.side == 'left' else "0 - 5"
                await self.broadcast({ 'game': 'end',
                                       'score': scoreString,
                                       'winner': winner.username,
                                       'type': dataParty['type'],
                                       'status': dataParty['status'],
                                       'id': dataParty['id']  })
                self.remove(disconnectedPlayer)
                self.remove(winner)
                self.isFinished = True
                return
            playerLeft = self.getPlayerLeft()
            playerRight = self.getPlayerRight()
            if playerLeft != None and playerRight != None:
                self.ball.move({ 'left': playerLeft,
                                 'right': playerRight })
                await self.broadcast({ 'game': 'positions',
                                       'positionBallX': self.ball.position['x'],
                                       'positionBallZ': self.ball.position['z'],
                                       'playerLeft': playerLeft.position,
                                       'playerRight': playerRight.position })
            if self.isScoreChanged():
                await self.broadcast({ 'game': 'score',
                                       'score': self.getScoreString() })
            if self.isEnd():
                dataParty = await updateParty(self.party_id, playerLeft, playerRight)
                await self.broadcast({ 'game': 'end',
                                       'winner': playerLeft.username if playerLeft.score == WIN_SCORE else playerRight.username, 
                                       'type': dataParty['type'],
                                       'status': dataParty['status'],
                                       'id': dataParty['id'] })
                self.isFinished = True
                return
            await asyncio.sleep(0.01)
    
class Game():
    def __init__(self):
        self.duos: List[Duo] = []
    
    def append(self, duo: Duo):
        self.duos.append(duo)
        self.activate()
        
    def remove(self, duo: Duo):
        self.duos.remove(duo)
    
    def getDuo(self, id: str):
        for duo in self.duos:
            if duo.id == id:
                return duo
        return None
    
    def isDuoFull(self, id: str=None):
        if id != None:
            duo = self.getDuo(id)
            if duo:
                return len(duo.players) == 2
        for duo in self.duos:
            if len(duo.players) == 2:
                return True
    
    def activate(self):
        for duo in self.duos:
            if len(duo.players) == 2 and duo.activated == False:
                duo.activated = True
                asyncio.create_task(duo.gameLoop())
            elif len(duo.players) == 0:
                self.remove(duo)

pong = Game()

def assignSide(duo: Duo):
    if duo.isLeftAdded == False:
        duo.isLeftAdded = True
        return 'left'
    return 'right'

def assignDuo(message: dict, socket: AsyncWebsocketConsumer):
    duo = pong.getDuo(message['id'])
    if duo == None:
        duo = Duo(message['id'], message['party_id'])
    if duo.isFinished: 
        return { 'error': 'game_ended' }
    user = socket.scope['user']
    player = Player(user.username, assignSide(duo), socket)
    duo.append(player)
    pong.append(duo)
    return { 'game': 'starting',
             'side': player.side } 

def leaveDuo(message: dict, socket: AsyncWebsocketConsumer):
    duo = pong.getDuo(message['id'])
    if duo != None:
        user = socket.scope['user']
        player = duo.getPlayer(user.username)
        if player != None:
            player.disconnected = True
    return None

def position(message: dict, socket: AsyncWebsocketConsumer):
    duo = pong.getDuo(message['id'])
    if duo:
        user = socket.scope['user']
        player = duo.getPlayer(user.username)
        if player != None:
            player.position = message['position']
    return None

def parseMessage(message: dict, socket: AsyncWebsocketConsumer):
    if 'game' in message:
        if message['game'] == 'starting':
            return assignDuo(message, socket)
        if message['game'] == 'leaved':
            return leaveDuo(message, socket)
        if message['game'] == 'player position':
            return position(message, socket)
    return { 'error': 'Invalid message' }

class PongConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        message = { 'message': 'Pong connection etablished !' }
        await self.send(json.dumps(message))

    async def disconnect(self, close_code):
        await self.close(close_code)

    async def receive(self, text_data):
        message: dict = json.loads(text_data)
        response = parseMessage(message, self)
        if response:
            await self.send(json.dumps(response))