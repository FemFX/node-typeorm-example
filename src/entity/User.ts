import { Entity, Column, OneToMany } from "typeorm";
import { Model } from "./Model";
import { Post } from "./Post";

enum UserRole {
  Admin = "admin",
  User = "user",
}

@Entity("users")
export class User extends Model {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  toJSON() {
    return { ...this, id: undefined };
  }
}
