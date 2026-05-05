let page;

beforeEach(async () => {
	page = await browser.newPage();
});

afterEach(async () => {
	await page.close();
});

describe('Github page tests', () => {
	beforeEach(async () => {
		await page.goto('https://github.com/team', {
			waitUntil: 'domcontentloaded',
		});
	});

	test("The h1 header content'", async () => {
		const firstLink = await page.$("header div div a");
		await firstLink.click();
		await page.waitForSelector('h1');
		const title2 = await page.title();
		expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
	}, 30000);

	test("The first link attribute", async () => {
		const actual = await page.$eval("a", link => link.getAttribute('href'));
		expect(actual).toEqual("#start-of-content");
	}, 30000);

	test("The page contains Sign in button", async () => {
		const btnSelector = ".btn-large-mktg.btn-mktg";
		await page.waitForSelector(btnSelector, {
			visible: true,
		});
		const actual = await page.$eval(btnSelector, link => link.textContent);
		expect(actual).toContain("Sign up for free")
	}, 30000);
});


test('Enterprise page should have correct title', async () => {
	await page.goto('https://github.com/enterprise', {
		waitUntil: 'domcontentloaded',
	});
	await page.waitForSelector('h1');
	const title = await page.title();

	expect(title).toContain(
		'The AI-powered developer platform for the agent-ready enterprise'
	);
}, 30000);

test('Pricing page should have correct h1', async () => {
	await page.goto('https://github.com/pricing', {
		waitUntil: 'domcontentloaded',
	});

	await page.waitForSelector('h1[class="h2-mktg"]');

	const h1 = await page.$eval('h1[class="h2-mktg"]', element => element.textContent.trim());

	expect(h1).toContain('Try the Copilot-powered platform');
}, 30000);

test('Signup page should have correct title', async () => {
	await page.goto('https://github.com/signup', {
		waitUntil: 'domcontentloaded',
	});

	const title = await page.title();

	expect(title).toContain('Sign up for GitHub');
}, 30000);