import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('tasks')
class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  done: boolean;

  @Column()
  alter_done: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Task };