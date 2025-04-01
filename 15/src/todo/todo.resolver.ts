import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { nullable: true })
  async todo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Todo | null> {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  async createTodo(
    @Args('title') title: string,
    @Args('description', { nullable: true }) description?: string,
  ): Promise<Todo> {
    return this.todoService.create({ title, description });
  }

  @Mutation(() => Todo)
  async updateTodo(
    @Args('id', { type: () => Int }) id: number,
    @Args('title', { nullable: true }) title?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('completed', { nullable: true }) completed?: boolean,
  ): Promise<Todo> {
    return this.todoService.update(id, { title, description, completed });
  }

  @Mutation(() => Todo)
  async deleteTodo(@Args('id', { type: () => Int }) id: number): Promise<Todo> {
    return this.todoService.remove(id);
  }
}
