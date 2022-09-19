export class MovieTemplate {
  static renderTableRow(move) {
    const tableRow = `
    <tr class="content-row" data-id=${move.id}>
      <td>${move.id}</td>
      <td>${move.name}</td>
      <td>${move.director}</td>
      <td>${move.nation}</td>
      <td>
        <button type="button" class="btn table-update-btn" data-id=${move.id}>Update</button>
      </td>
      <td>
        <button type="button" class="btn table-delete-btn" data-id=${move.id}>Delete</button>
      </td>
    </tr>`;

    return tableRow;
  }
}
