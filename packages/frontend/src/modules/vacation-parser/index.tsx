import { ReactLoadableModuleAsync } from "@app/front-modules";

import { UserItem, ForbiddenIntersection } from "../../pages/home/async";
import { parseExcelFile, VacationParseResult } from "../../components/FileParser";

export class VacationParserModule extends ReactLoadableModuleAsync<{}> {
  private _users: UserItem[] = [];
  private _forbiddenIntersections: ForbiddenIntersection[] = [];
  private _weekends: string[] = [];

  get users(): UserItem[] {
    return this._users;
  }

  get forbiddenIntersections(): ForbiddenIntersection[] {
    return this._forbiddenIntersections;
  }

  get weekends(): string[] {
    return this._weekends;
  }

  async parse(file: File): Promise<void> {
    const result: VacationParseResult = await parseExcelFile(file);
    this._users = result.users;
    this._forbiddenIntersections = result.forbiddenIntersections;

    this._weekends = result.weekends;

    if (result.errors.length > 0) {
      alert("Обнаружены ошибки:\n\n" + result.errors.join("\n"));
    } else if (result.warnings.length > 0) {
      alert("Предупреждения:\n\n" + result.warnings.join("\n"));
    }
  }

  recalculateForbiddenIntersections(users: UserItem[]) {
    const intersections: ForbiddenIntersection[] = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        const userA = users[i];
        const userB = users[j];

        // Пересечения считаются только внутри одной группы
        if (userA.group && userA.group === userB.group) {
          const overlapDates = userA.vacationDates.filter((date) => userB.vacationDates.includes(date));

          if (overlapDates.length > 0) {
            intersections.push({
              employee1: userA.fullName,
              employee2: userB.fullName,
              group: userA.group,
            });
          }
        }
      }
    }

    this._forbiddenIntersections = intersections;
  }
}
