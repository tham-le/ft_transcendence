import { main } from './app.js';

export function getElt(selector)
{
	if (!selector)
		return null;
	else if (document.querySelector(selector) !== null)
		return document.querySelector(selector);
	else if (document.getElementById(selector) !== null)
		return document.getElementById(selector);
	else if (document.getElementsByClassName(selector) !== null)
		return document.getElementsByClassName(selector);
	else if (document.getElementsByTagName(selector) !== null)
		return document.getElementsByTagName(selector);
	else
		return null;
}

export function createElt(tag, className, textContent)
{
	const element = document.createElement(tag);
	if (className)
		element.classList.add(className);
	if (textContent)
		element.textContent = textContent;
	return element;
}

export function updateElt(elt, textContent)
{
	if (!elt)
		return ;
	elt.textContent = textContent;
}

export function resizeMain()
{
	const footer = getElt('footer');
	const footerRect = footer.getBoundingClientRect();
	const header = getElt('header');
	const headerRect = header.getBoundingClientRect();
	
	main.style.marginTop = `${headerRect.bottom}px`;
}

export function createFormItem(labelText, inputType, inputId, options = []) {
    const label = document.createElement('label');
    label.classList.add('form-label');
    label.setAttribute('for', inputId);
    label.textContent = labelText;

    const input = document.createElement('input');
    input.classList.add('form-control');
    input.type = inputType;
    input.id = inputId;

    if (options.length > 0) {
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            input.appendChild(optionElement);
        });
    }

    return { label, input };
}