<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => fake()->paragraph(random_int(2, 5)),
            'author_name' => fake()->name(),
            'author_email' => fake()->safeEmail(),
            'author_website' => fake()->optional(0.3)->url(),
            'status' => fake()->randomElement(['approved', 'approved', 'pending']), // More approved
            'ip_address' => fake()->ipv4(),
            'user_agent' => fake()->userAgent(),
            'post_id' => Post::factory(),
            'parent_id' => null,
        ];
    }

    /**
     * Indicate that the comment should be approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
        ]);
    }

    /**
     * Indicate that the comment should be pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
        ]);
    }

    /**
     * Indicate that this is a reply to another comment.
     */
    public function reply(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => Comment::factory(),
        ]);
    }
}