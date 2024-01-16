import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AuditEntity } from 'src/features/common/entities/audit.entity';

import type { User } from 'src/features/users/entities/user.entity';

@Entity({ name: 'movies' })
export class Movie extends AuditEntity {
  constructor(partial: Partial<Movie>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ type: 'int' })
  publishingYear: number;

  @ApiProperty()
  @Column()
  imageUri: string;

  @ManyToOne('User', 'movies')
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Column()
  userId: string;
}
