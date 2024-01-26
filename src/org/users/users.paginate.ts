import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate'
import { User } from './users.entity'

export const UserPaginateConfig: PaginateConfig<User> = {
  sortableColumns: ['id', 'name'],
  relations: ['roles'],
  nullSort: 'last',
  defaultSortBy: [['name', 'DESC']],
  searchableColumns: ['name'],
  select: ['id', 'name', 'roles.id', 'roles.permissions', 'roles.name'],
  filterableColumns: {
    name: [FilterOperator.EQ, FilterOperator.ILIKE, FilterSuffix.NOT],
  },
}
