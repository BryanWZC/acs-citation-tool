let acsStringArr = [];

/**
 * parses a comma separated string for full names into an acs parsed string
 * @param  {Function} nameFunction - receives a name function that manipulates each full name based on their options
 * @param  {String}   names        - string of names to parse 
 * @return {String}                - acs parsed string
 */
const handleNames = (nameFunction, names) => names.split(',').map(fullName => nameFunction(fullName)).sort().reduce((acc, fullName, index, arr) => index !== arr.length - 1 ? acc += `${fullName}; ` : acc += `${fullName} `, '');

/**
 * parses a single full name into an acs parsed name string in option 1 format
 * @param  {String} fullName - current full name in the following format: first name, middle name, last name 
 * @return {String}          - acs parsed string
 */
const handleName = (fullName) => fullName.replace(/(dr\.)+|(mrs\.)+|(mr\.)+|(ms\.)+|(prof\.)+|(\sand\s)+/ig,'').match(/[A-Z][a-z]*/g).reduce((acc, name, index, arr) => index !== arr.length - 1 ? acc += `${name[0]}. ` : acc = `${name}, ` + acc, '').trim();

/**
 * parses a single full name into an acs parsed name string in option 2 format
 * @param  {String} fullName - current full name in the following format: last name, first name capital letter, middle name capital letter 
 * @return {String}          - acs parsed string
 */
const handleName2 = (fullName) => fullName.replace(/(dr\.)+|(mrs\.)+|(mr\.)+|(ms\.)+|(prof\.)+|(\sand\s)+/ig,'').match(/[A-Z][a-z]*/g).reduce((acc, name, index, arr) => index === 0 ? acc += name : acc += ` ${name}.`, '').trim();

/**
 * Adds a full stop at the end of a title to be added to the complete acs parsed string
 * @param  {String} title - current title
 * @return {String}       - acs parsed title
 */
const handleArticleTitle = (title) => `${title.split(' ').map(word => ['of', 'and', 'on', 'in'].includes(word.toLowerCase()) ? word : word[0].toUpperCase() + word.slice(1)).join(' ')}. `;

/**
 * Adds a full stop at the end of a journal title to be added to the complete acs parsed string
 * @param  {String} journal - current journal
 * @return {String}         - acs parsed title
 */
const handleJournalTitle = (journal) => `${journal} `;

/**
 * year of publication
 * @param  {String} year - current year 
 */
const handleYear = (year) => `${year.replace(/[a-z]+|\.+|\s+/gi,'')}, `;

/**
 * volume title of publication
 * @param {String} volume - current volume
 */
const handleVolume = (volume) => `${volume.replace(/[a-z]+|\.+|\s+/gi,'')}, `;

/**
 * pages
 * @param {String} pages - current page(s), page-page 
 */
const handlePages = (pages) => `${pages.replace(/[a-z]+|\.+|\s+/gi,'')}.`


/**
 * onclick function that parses all information into acs and displays it in #results
 * @return {Null}
 */
const parseStringToAcs = () => {
    const names1 = document.querySelector('#names-input').value.trim();
    const names2 = document.querySelector('#names-input-2').value.trim();
    const articleTitle = document.querySelector('#article-title').value.trim();
    const journalTitle = document.querySelector('#journal-title').value.trim();
    const year = document.querySelector('#year').value.trim();
    const volume = document.querySelector('#journal-volume').value.trim();
    const pages = document.querySelector('#pages').value.trim();

    const parsedNames = names1 ? handleNames(handleName, names1) : handleNames(handleName2, names2);

    const acsString = `
    <p id='acs-citation'>${parsedNames}${handleArticleTitle(articleTitle)}<span>${handleJournalTitle(journalTitle)}</span>[online] <span id='span-year'>${handleYear(year)}</span><span>${handleVolume(volume)}</span>${handlePages(pages)}</p>
    `;

    acsStringArr.push(acsString);
    document.querySelector('#results').innerHTML = acsStringArr.join('<br>');
}

/**
 * Removes last citation
 */
const handleRemove = () =>{
    acsStringArr = acsStringArr.slice(0, -1);
    document.querySelector('#results').innerHTML = acsStringArr.join('<br>');
};

const handleCassi = () => window.open('https://cassi.cas.org/search.jsp', '_blank');

document.querySelector('.submit').onclick = parseStringToAcs;

document.querySelector('.remove').onclick = handleRemove;

document.querySelector('.cassi').onclick = handleCassi;