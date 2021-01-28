/// <reference types="cypress" />

import settings from "../../src/__tests__/__mocks__/settingsMock.json";
import checkpoints from "../../src/__tests__/__mocks__/checkpointsMock.json";

const finishedCheckpoint = checkpoints.map((cp) => ({
  ...cp,
  log: [
    ...cp.log,
    {
      car: "fcf3b1bd-5110-4c2e-9ec8-5e62308c2675",
      timestamp: 1611608352056,
    },
    {
      car: "11fa369a-d5a6-4979-942d-9f139670ce6c",
      timestamp: 1611608372056,
    },
  ],
}));

describe("Racing Simulation", () => {
  describe("Open App", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/settings", { payload: settings });
      cy.intercept("POST", "**/start", { status: 200 });
      cy.intercept("POST", "**/stop", { status: 200 });
      cy.visit("http://localhost:3000/");
    });
    it("should visit setup page", () => {
      cy.url().should("include", "/setup");
    });
    it("should render input for cars", () => {
      cy.get(".input").should("have.length", settings.cars_count + 1);
    });
    describe("Empty fields", () => {
      describe("Submit form", () => {
        beforeEach(() => {
          cy.get(".button").click();
        });
        it("should not redirect", () => {
          cy.url().should("include", "/setup");
        });
        it("should show error messages", () => {
          cy.get(".error-message").should(
            "have.length",
            settings.cars_count + 1
          );
        });
      });

      describe("Fields Correct", () => {
        it("should redirect to simulation", () => {
          cy.intercept("GET", "**/checkpoints", { payload: checkpoints });
          cy.get(`#racerNameInput${settings.cars[0]}`).type(
            "Rubinho Barrichelo"
          );
          cy.get(`#racerNameInput${settings.cars[1]}`).type("Ayrton Senna");
          cy.get(`#racerNameInput${settings.cars[2]}`).type("Felipe Massa");
          cy.get(`#lapesCount`).type(1);
          cy.get(".button").click();
          cy.url().should("include", "/simulation");
        });

        describe("Simulation", () => {
          it("should redirect to result on finished race", () => {
            cy.intercept("GET", "**/checkpoints", {
              payload: finishedCheckpoint,
            });
            cy.intercept("GET", "**/checkpoints", { payload: checkpoints });
            cy.get(`#racerNameInput${settings.cars[0]}`).type(
              "Rubinho Barrichelo"
            );
            cy.get(`#racerNameInput${settings.cars[1]}`).type("Ayrton Senna");
            cy.get(`#racerNameInput${settings.cars[2]}`).type("Felipe Massa");
            cy.get(`#lapesCount`).type(1);
            cy.get(".button").click();
            cy.url().should("include", "/results");
          });
        });
      });
    });
  });

  describe("On server fail", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
      cy.intercept("GET", "**/settings", {
        statusCode: 500,
      });
    });
    it("should show error dialog", () => {
      cy.get(".error-bar").should("have.class", "enter");
    });
  });
});
