<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(4, 8));
        $content = fake()->paragraphs(random_int(5, 12), true);
        $status = fake()->randomElement(['draft', 'published', 'published', 'published']); // More published posts
        
        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'excerpt' => fake()->optional()->text(200),
            'content' => $content,
            'featured_image' => fake()->optional()->imageUrl(800, 600, 'business'),
            'media' => fake()->optional()->randomElement([
                [
                    fake()->imageUrl(800, 600, 'technology'),
                    fake()->imageUrl(800, 600, 'business'),
                ],
                null
            ]),
            'status' => $status,
            'published_at' => $status === 'published' ? fake()->dateTimeBetween('-1 year', 'now') : null,
            'views_count' => $status === 'published' ? fake()->numberBetween(0, 1000) : 0,
            'meta_tags' => fake()->optional()->randomElement([
                [
                    'title' => fake()->sentence(6),
                    'description' => fake()->sentence(12),
                    'keywords' => fake()->words(5, true),
                ],
                null
            ]),
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
        ];
    }

    /**
     * Indicate that the post should be published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-6 months', 'now'),
            'views_count' => fake()->numberBetween(10, 500),
        ]);
    }

    /**
     * Indicate that the post should be a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
            'views_count' => 0,
        ]);
    }
}