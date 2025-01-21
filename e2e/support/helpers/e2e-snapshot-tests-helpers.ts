export const buildSnapshotName = (name: string) =>
  `${Cypress.currentTest.title} ${name}`.replaceAll(" ", "_").toLowerCase();

const HIDE_SCROLLBARS_STYLES = `
  *::-webkit-scrollbar {
    visibility: hidden;
    width: 15px;
  }
`;
const PREVENT_POINTER_EVENTS_STYLES = `
  * {
    pointer-events: none;
  }
`;

export const captureSnapshot = (
  name: string,
  { allowPointerEvents }: { allowPointerEvents?: boolean } = {
    allowPointerEvents: false,
  },
) => {
  cy.document().then(document => {
    const style = document.createElement("style");

    style.innerHTML = `
      ${HIDE_SCROLLBARS_STYLES}

      ${
        // In most cases we want to disable pointer events to prevent flakiness caused by hover states
        !allowPointerEvents && PREVENT_POINTER_EVENTS_STYLES
      }
    `;

    // Hide scrollbars visually and make its width constant before taking a snapshot
    document.head.appendChild(style);

    cy.compareSnapshot(buildSnapshotName(name)).then(() => {
      // Restore scrollbar styles back to default
      style.remove();
    });
  });
};
