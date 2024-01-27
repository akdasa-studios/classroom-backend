import { FilterOperator, FilterSuffix, PaginateConfig } from 'nestjs-paginate'
import { User } from './users.entity'

export const UserPaginateConfig: PaginateConfig<User> = {
  sortableColumns: ['id', 'name'],
  relations: ['roles'],
  nullSort: 'last',
  defaultSortBy: [['name', 'DESC']],
  searchableColumns: ['name'],
  select: ['id', 'name', 'status', 'email', 'title', 'department', 'avatarUrl', 'roles.id'],
  filterableColumns: {
    name: [FilterOperator.EQ, FilterOperator.ILIKE, FilterSuffix.NOT],
  },
}
