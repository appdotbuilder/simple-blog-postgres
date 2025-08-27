<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Blog Admin',
            'email' => 'admin@example.com',
        ]);

        // Create additional users
        $users = User::factory(5)->create();

        // Create categories
        $categories = collect([
            ['name' => 'Technology', 'color' => '#3B82F6'],
            ['name' => 'Business', 'color' => '#10B981'],
            ['name' => 'Design', 'color' => '#8B5CF6'],
            ['name' => 'Marketing', 'color' => '#F59E0B'],
            ['name' => 'Lifestyle', 'color' => '#EC4899'],
        ])->map(function ($categoryData) {
            return Category::factory()->create($categoryData);
        });

        // Create posts
        $posts = collect();
        
        // Create posts for admin user
        $adminPosts = Post::factory(15)
            ->published()
            ->for($admin, 'author')
            ->create([
                'category_id' => fn () => $categories->random()->id,
            ]);
        $posts = $posts->merge($adminPosts);

        // Create some draft posts
        $draftPosts = Post::factory(5)
            ->draft()
            ->for($admin, 'author')
            ->create([
                'category_id' => fn () => $categories->random()->id,
            ]);
        $posts = $posts->merge($draftPosts);

        // Create comments for published posts
        $publishedPosts = $posts->where('status', 'published');
        
        $publishedPosts->each(function ($post) {
            // Create top-level comments
            $topLevelComments = Comment::factory(random_int(2, 8))
                ->approved()
                ->create(['post_id' => $post->id]);

            // Create some replies
            $topLevelComments->take(random_int(1, 3))->each(function ($comment) use ($post) {
                Comment::factory(random_int(1, 3))
                    ->approved()
                    ->create([
                        'post_id' => $post->id,
                        'parent_id' => $comment->id,
                    ]);
            });

            // Create some pending comments
            Comment::factory(random_int(0, 2))
                ->pending()
                ->create(['post_id' => $post->id]);
        });

        $this->command->info('Blog seeder completed!');
        $this->command->info("Created: {$posts->count()} posts, {$categories->count()} categories, and comments");
    }
}
