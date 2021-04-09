import { beverages } from '../test-data';

Feature('Coffee Shop');

Scenario('Shows "Coffee Shop" heading', ({ I }) => {
  I.amOnPage('/');
  I.see('Coffee Shop');
});

Data(beverages).Scenario('Add one order', ({ I, current }) => {
  I.amOnPage('/');

  I.fillField('Order', current.order);
  I.fillField('Amount', current.amount);
  I.click('Add');

  I.see('Submit Order');
});

Scenario('Remove one item from order', ({ I }) => {
  I.amOnPage('/');

  I.addOrder('Cafè au lait', 12);
  I.addOrder('Cappuccino', 2);

  I.say('Remove first item from order');
  I.click(locate('li .btn-danger').first().withText('delete'));

  I.see('Cappuccino');
  I.dontSee('Cafè au lait');
});

Scenario('Submit an order', ({ I }) => {
  I.amOnPage('/');

  I.addOrder('Coffee', 2);
  I.addOrder('Espresso', 3);
  I.addOrder('Tea', 1);
  I.click(locate('li').withText('Mark'));
  I.click('Submit Order');

  I.see('customer: Mark');
  I.dontSee('Submit Order');
});

Scenario('Search for an order', ({ I }) => {
  I.amOnPage('/');

  I.addOrder('Freakshake', 2);
  I.click('Submit Order');

  I.addOrder('Cappuccino', 3);
  I.click('Submit Order');

  I.addOrder('Affogato', 1);
  I.click('Submit Order');

  I.fillField('Search', 'affogato');
  I.click('Search');

  I.see('Affogato');
  I.dontSee('Cappuccino');
  I.dontSee('Freakshake');

  I.click('Clear search term');
  I.say('See all orders');

  I.see('Affogato');
  I.see('Cappuccino');
  I.see('Freakshake');
});

Scenario('Done an order', ({ I }) => {
  I.amOnPage('/');

  I.addOrder('Espresso con panna', 1);
  I.click(locate('li').withText('Mark'));
  I.click('Submit Order');

  I.see('Espresso con panna');
  I.see('customer: Mark');

  I.click('DONE');

  I.dontSee('Espresso con panna');
});
