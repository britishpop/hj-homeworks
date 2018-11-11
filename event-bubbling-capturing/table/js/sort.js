'use strict';

function handleTableClick(event) {
  const currentTag = event.target;

  if (currentTag.tagName === "TH") {
    const sortDirection = currentTag.dataset.dir;
    const table = document.getElementsByTagName("table")[0];
    table.dataset.sortBy = currentTag.dataset.propName;

    if (sortDirection > 0 || !sortDirection) {
      currentTag.dataset.dir = -1;
    } else if (sortDirection < 0) {
      currentTag.dataset.dir = 1;
    }

    sortTable(table.dataset.sortBy, sortDirection);
  }
}
