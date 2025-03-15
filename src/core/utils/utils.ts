export class Utils {
  static hasProperties(properties: string[], obj: object) {
    let verify: boolean = true;
    let missingProperties: string = "";
    for (let x in properties) {
      if (!(properties[x] in obj)) {
        verify = false;
        missingProperties += `${properties[x]}, `;
      }
    }
    return {
      verify,
      properties: missingProperties,
    };
  }
}
