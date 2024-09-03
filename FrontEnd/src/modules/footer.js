/**
 
 * Builds the site footer element.
 
 */
export function buildFooter() {
    const footerElement = document.querySelector("footer");

    footerElement.innerHTML = 
   `<nav>
		<ul>
			<li>Mentions Légales</li>
		</ul>
	</nav>`
}