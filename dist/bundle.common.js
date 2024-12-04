/*!
* @plumelearning/page-manager v2.2.0
* Copyright 2018, 2019, 2020 Strategic Technology Solutions DBA Plum eLearning
* @license Apache-2.0
*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
@license
Copyright 2018, 2019, 2020 Strategic Technology Solutions DBA Plum eLearning


Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const PageManager = class {
  /**
   * @constructor
   * @param {Component[]} pageList
   */
  constructor(pageList) {
    this.pages = pageList.filter((c) => c.name);
    this.pageOf = {};
    for (let n = 0; n < this.pages.length; ++n) {
      const page = this.pages[n];
      page.number = 1 + n;
      this.pageOf[page.name] = page;
    }
    // window.console.dir(this);
  }

  /**
   * Get page map: name => component
   * @return {Map}
   */
  getPageMap() {
    return new Map(this.pages.map((page) => [page.name, page]));
  }

  /**
   * Get page component
   * @param {(Number \| String \| Object)} page
   * @return { Component \| undefined }
   */
  getComponent(page) {
    let c = undefined;
    if (!isNaN(page)) {
      // window.console.log("number");
      c = this.pages[Number(page) - 1];
    } else if (typeof page === "string") {
      // window.console.log("string");
      c = this.pageOf[page.trim()];
    } else if (typeof page === "object" && page.name) {
      // window.console.log("object");
      c = this.pageOf[page.name];
    }
    // window.console.log(`getComponent`, page, c);
    return c;
  }

  /**
   * Get page name or ""
   * @param {(Number \| String \| Object)} page
   * @return {String}
   */
  getName(page) {
    const c = this.getComponent(page);
    return c ? c.name : "";
  }

  /**
   * Get page number or 0
   * @param {(Number \| String \| Object)} page
   * @return {Number}
   */
  getNumber(page) {
    const c = this.getComponent(page);
    return c ? c.number : 0;
  }

  /**
   * Get page route path
   * @param {(Number \| String \| Object)} page
   * @return {String} route path
   */
  getRoute(page) {
    const c = this.getComponent(page);
    if (!c) return "";
    let path = `/page/${c.name}`;
    if (c.components && c.components.BranchingScenario) {
      path += `/:scenario`;
    }
    return path;
  }

  /**
   * Get list of page components
   * @return {Component[]}
   */
  getPages() {
    return this.pages;
  }

  /**
   * Get list of page names
   * @return {String[]}
   */
  pageNames() {
    return Object.keys(this.pageOf);
  }

  /**
   * Get page count
   * @return {Number}
   */
  numPages() {
    return this.pages.length;
  }

  /**
   * Get starting pages
   * @return {(Component \| undefined)}
   */
  start() {
    return this.pages[0];
  }
};

exports.default = PageManager;
