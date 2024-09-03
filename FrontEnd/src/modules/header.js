/**
 
 * Builds the site header element.
 
 */
export function buildHeader() {
  const headerElement = document.querySelector("header");

  headerElement.innerHTML = 
 `<h1>Sophie Bluel <span>Architecte d'intérieur</span></h1>
  <nav>
		<ul>
			<li>projets</li>
			<li>contact</li>
			<li>login</li>
			<li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
		</ul>
	</nav>`;
}
