import './events';
import './global';

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string, willPass: boolean): Chainable<JQuery<HTMLElement>>;
      saveAuth(): Chainable<JQuery<HTMLElement>>;
      getAuth(url: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
