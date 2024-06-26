/**
 * @brief Wrapper para poder llamar al creador de ramas desde Apps Script
 * @note Reemplazar por los valores que sean apropiados
 */
function wrapper() {
  // Reemplazar por los valores apropiados
  
  // Propietario del repositorio
  const OWNER = "";
  // Nombre del repositorio
  const REPO = "";
  // Este debe ser el nombre de la hoja que tiene los nombres de las ramas
  const SHEET_NAME = "";
  // Rango de celdas de la columna que contiene los nombres de las ramas
  const BRANCH_RANGE = "";
  // Token de GitHub, tiene que tener los permisos de 'repo' y 'workflow'
  const TOKEN = "";
  
  // Busca las ramas que hay que crear
  const branches = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME).getRange(BRANCH_RANGE).getValues();
  // Crea las ramas con los datos
  create_branches(OWNER, REPO, branches, TOKEN);
}

/**
 * @brief Crea las ramas solicitadas
 * @param owner es el usuario u organizacion propietaria del repo
 * @param repo es el nombre del repositorio
 * @param branches lista con las ramas a crear
 * @param token credencial de GitHub para autorizar la accion
 */
function create_branches(owner, repo, branches, token) {
  // URL de la API
  const api = 'https://api.github.com/repos';

  // Reviso todas las ramas
  branches.forEach(branch => {
    // Veo que no este vacio
    if(branch != "") {
      
      // Armo el URL
      const url = `${api}/${owner}/${repo}/git/refs`;

      // Armo el payload
      const payload = {
        ref: "refs/heads/" + branch,
        sha: getLatestCommitSha(owner, repo, token)
      };
      
      // Opciones del request
      const options = {
        method: "post",
        contentType: "application/json",
        headers: {
          Authorization: "token " + token
        },
        payload: JSON.stringify(payload)
      };
      
      // Invoco la API
      const response = UrlFetchApp.fetch(url, options);
      Logger.log(`Rama creada: ${branch} en el repo ${owner}/${repo}`);
    }
  });
}

/**
 * @brief Obtiene el ultimo estado del repositorio en la rama main
 * @param owner propietario del repositorio
 * @param repo repositorio base
 * @param token credencial de GitHub para autorizar la operacion
 */
function getLatestCommitSha(owner, repo, token) {
  // Armo API a partir de la rama main
  const url = `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`;
  // Opciones del request
  const options = {
    method: 'get',
    contentType: 'application/json',
    headers: {
      Authorization: 'token ' + token
    }
  };
  // Hago el request a la API
  const response = UrlFetchApp.fetch(url, options);
  // Devuelvo el SHA (ultimo estado del repositorio)
  return JSON.parse(response.getContentText()).object.sha;
}