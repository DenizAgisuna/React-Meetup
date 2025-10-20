/* eslint-disable testing-library/prefer-screen-queries */
import { test } from '@playwright/test';

test('basic meetup create and favorites flow', async ({ page }) => {
 await page.goto('http://localhost:3000/');
await page.getByRole('link', { name: 'All Meetups' }).click();
await page.getByRole('link', { name: 'Add New Meetup' }).click();
await page.getByRole('textbox', { name: 'Meetup Title' }).click();
await page.getByRole('textbox', { name: 'Meetup Title' }).fill('Meetup Title Automation');
await page.getByRole('textbox', { name: 'Meetup Image' }).click();
await page.getByRole('textbox', { name: 'Meetup Image' }).fill('http://catimage.com');
await page.getByRole('textbox', { name: 'Meetup Image' }).press('Tab');
await page.getByRole('textbox', { name: 'Address' }).fill('Somwhere lane 1');
await page.getByRole('textbox', { name: 'Address' }).press('Tab');
await page.getByRole('textbox', { name: 'Description' }).fill('Lorem ipsum');
await page.getByRole('button', { name: 'Add Meetup' }).click();
await page.getByRole('listitem').filter({ hasText: 'Meetup Title' }).getByRole('button').click();
await page.getByRole('link', { name: 'My Favorites1' }).click();
await page.getByRole('button', { name: 'Remove from favorites' }).click();
await page.locator('[data-test="app"] div').filter({ hasText: 'Favorites PageYou don\'t have' }).click();
await page.getByRole('link', { name: 'All Meetups' }).click();
await page.getByRole('listitem').filter({ hasText: 'Meetup Title' }).getByRole('button').click();
await page.getByRole('listitem').filter({ hasText: 'This is a third' }).getByRole('button').click();
await page.getByRole('listitem').filter({ hasText: 'This is a second' }).getByRole('button').click();
await page.getByRole('button', { name: 'Add to favorites' }).click();
await page.getByRole('link', { name: 'My Favorites4' }).click();
await page.getByRole('listitem').filter({ hasText: 'This is a first meetupMeetupstreet 5, 12345 Meetup CityThis is a first, amazing' }).getByRole('button').click();
await page.getByRole('listitem').filter({ hasText: 'This is a second' }).getByRole('button').click();
await page.getByRole('listitem').filter({ hasText: 'This is a third' }).getByRole('button').click();
await page.getByRole('button', { name: 'Remove from favorites' }).click();

});