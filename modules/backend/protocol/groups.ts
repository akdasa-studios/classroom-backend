import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID, IsISO8601 } from 'class-validator'
import * as protocol from '@classroom/protocol/GroupsService'

// -- Models ----------------------------------------------------------------

export class Group implements protocol.Group {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  @IsString()
  description: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  leaderId: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({ example: "2024-05-05T07:32:10.490Z" })
  @IsISO8601({ strict: true })
  startsAt: string
}


// -- Create ----------------------------------------------------------------

export class CreateGroupRequest implements protocol.CreateGroupRequest {
  @ApiProperty({ example: 'Bhakti-shastri' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  leaderId: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({ example: "2024-05-05T07:32:10.490Z" })
  @IsNotEmpty()
  @IsISO8601({ strict: true })
  startsAt: string
}

export class CreateGroupResponse implements protocol.CreateGroupResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsNotEmpty()
  @IsString()
  id: string
}


// -- Get -------------------------------------------------------------------

export class GetGroupResponse implements protocol.GetGroupResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  leaderId: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  courseId: string

  @ApiProperty({ example: "2024-05-05T07:32:10.490Z" })
  @IsISO8601({ strict: true })
  startsAt: string
}


export class GetGroupsResponse implements protocol.GetGroupsResponse {
  @ApiProperty({ type: Group, isArray: true })
  items: Array<any> // TODO
}


// -- Update ----------------------------------------------------------------

export class UpdateGroupRequest implements protocol.UpdateGroupRequest {
  @ApiPropertyOptional({ example: 'Bhakti-shastri' })
  @IsString()
  name?: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  @IsString()
  description?: string

  @ApiPropertyOptional({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  leaderId?: string

  @ApiPropertyOptional({ example: 123456789 })
  @IsISO8601({ strict: true })
  startsAt?: string
}

export class UpdateGroupResponse implements protocol.UpdateGroupResponse {
}

