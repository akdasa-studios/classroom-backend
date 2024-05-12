import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Session, User } from '@classroom/admin/entities'
import { EntitiesService } from '@classroom/admin/utils/entities.service'

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>,
  ) { }

  /**
   * Create a new session for a user with a given scope
   * @param user User to create a session for
   * @param scope Scope of the session
   * @returns Session
   */
  async create(
    user: User,
    scope: string
  ): Promise<Session> {
    const session = new Session()
    session.user = user
    session.scope = scope
    session.refreshToken = this.generateRefreshToken()
    return await this.repository.save(session)
  }

  /**
   * Find a session by refresh token and scope
   * @param refreshToken Refresh token
   * @param scope Scope of the session
   * @returns Session
   */
  async findByRefreshToken(
    refreshToken: string,
    scope: string,
  ): Promise<Session | null> {
    return await this.repository.findOne({
      relations: { user: true },
      where: { refreshToken }
    })
  }

  /**
   * Generate a random refresh token
   * @param size Size of the refresh token
   * @returns Refresh token
   */
  private generateRefreshToken(size: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890';
    const charactersLength = characters.length;
    let password = '';
    for (let i = 0; i < size; ++i) {
      password += characters[Math.floor(Math.random() * charactersLength)];
    }
    return password;
  }
}

