export class Utils {
  static isValidDate(dateString: string): boolean {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }
    const [year, month, day] = dateString.split("-").map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
      return false;
    }
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }
    return true;
  }
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
