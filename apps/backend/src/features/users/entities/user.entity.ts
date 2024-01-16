import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany } from 'typeorm';

import { AuditEntity } from 'src/features/common/entities/audit.entity';

import type { Movie } from 'src/features/movies/entities/movie.entity';

@Entity({ name: 'users' })
export class User extends AuditEntity {
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @ApiProperty()
  @OneToMany('Movie', 'user')
  movies: Movie[];
}
