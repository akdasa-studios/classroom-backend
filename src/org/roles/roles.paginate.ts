import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate'
import { Role } from './roles.entity'

export const RolePaginateConfig: PaginateConfig<Role> = {
  sortableColumns: ['id', 'name'],
  nullSort: 'last',
  defaultSortBy: [['name', 'DESC']],
  searchableColumns: ['name', 'description'],
  select: ['id', 'name', 'description', 'permissions'],
  filterableColumns: {
    name: [FilterOperator.EQ, FilterOperator.ILIKE, FilterSuffix.NOT],
  },
}
