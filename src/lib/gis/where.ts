import {
  ADMIN_LEVELS,
  ancestorsOf,
  type AdminLevel,
  type AdminLevelId,
  type LocationFilters,
} from "@/config/layers";
import { escapeSqlLiteral } from "@/lib/utils";

export function sqlEq(field: string, value: string): string {
  return `${field} = '${escapeSqlLiteral(value)}'`;
}

export function sqlLike(field: string, value: string): string {
  return `LOWER(${field}) LIKE '%${escapeSqlLiteral(value.toLowerCase())}%'`;
}

/**
 * Build a definition expression using admin fields that exist at `level`
 * (Division has adm1 only, Union has adm1–adm4), plus optional Unit.
 */
export function whereForLevel(
  level: AdminLevel,
  filters: LocationFilters,
  unit?: string | null,
): string {
  const parts: string[] = [];
  for (const ancestor of ancestorsOf(level.id)) {
    const value = filters[ancestor.id];
    if (value) parts.push(sqlEq(ancestor.nameField, value));
  }
  if (unit && unit.trim()) {
    // Geometry + Crime Data field name is lowercase `unit` (not Unit)
    parts.push(sqlEq("unit", unit.trim()));
  }
  return parts.join(" AND ");
}

export function whereForLevelId(
  levelId: AdminLevelId,
  filters: LocationFilters,
  unit?: string | null,
): string {
  return whereForLevel(ADMIN_LEVELS.find((l) => l.id === levelId)!, filters, unit);
}

export function describeFilters(
  filters: LocationFilters,
  unit?: string | null,
): string {
  const parts: string[] = [];
  for (const level of ADMIN_LEVELS) {
    const value = filters[level.id];
    if (value) parts.push(`${level.label}: ${value}`);
  }
  if (unit) parts.push(`Unit: ${unit}`);
  return parts.join(" · ") || "Bangladesh";
}
