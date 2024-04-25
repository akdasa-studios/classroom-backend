import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'
import * as protocol from '@classroom/protocol/AccountsService'

// -- Models ----------------------------------------------------------------

export class Group implements protocol.Group {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  name: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  description?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  leaderId: string

  @ApiProperty({ example: 123456789 })
  startsAt: number
}


// -- Create ----------------------------------------------------------------

export class CreateGroupRequest implements protocol.CreateGroupRequest {
  @ApiProperty({ example: 'Bhakti-shastri' })
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  @IsNotEmpty()
  description?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsNotEmpty()
  leaderId: string

  @ApiProperty({ example: 123456789 })
  @IsNotEmpty()
  @IsNumber()
  startsAt: number
}

export class CreateGroupResponse implements protocol.CreateGroupResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsNotEmpty()
  id: string
}


// -- Get -------------------------------------------------------------------

export class GetGroupResponse implements protocol.GetGroupResponse {
  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsUUID(4)
  id: string

  @ApiProperty({ example: 'Bhakti-shastri' })
  name: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  description?: string

  @ApiProperty({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  leaderId: string

  @ApiProperty({ example: 123456789 })
  startsAt: number
}


export class GetGroupsResponse implements protocol.GetGroupsResponse {
  @ApiProperty({ type: Group, isArray: true })
  items: Group[]
}


// -- Update ----------------------------------------------------------------

export class UpdateGroupRequest implements protocol.UpdateGroupRequest {
  @ApiPropertyOptional({ example: 'Bhakti-shastri' })
  @IsNotEmpty()
  name?: string

  @ApiPropertyOptional({ example: 'One year couse ...' })
  @IsNotEmpty()
  description?: string

  @ApiPropertyOptional({ example: '6eb216f2-543d-4f15-88f5-f325a1bdcafd' })
  @IsNotEmpty()
  leaderId?: string

  @ApiPropertyOptional({ example: 123456789 })
  @IsNotEmpty()
  @IsNumber()
  startsAt?: number
}

export class UpdateGroupResponse implements protocol.UpdateGroupResponse {
}

