# Vidads - Interactive Video Platform

A Laravel-based platform for creating interactive videos with clickable elements and engaging content.

## Features

- **Video Management**: Upload videos or use YouTube URLs
- **Interactive Elements**: Add text, images, buttons, quizzes, and links to videos
- **Real-time Preview**: See interactive elements in action while editing

## Requirements

- PHP 8.1 or higher
- Composer
- Node.js 18+ and npm
- MySQL/PostgreSQL database
- Laravel 10+

## Quick Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd vidads
composer install
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
php artisan key:generate
```

### 3. Database Configuration

Update your `.env` file with database credentials:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vidads
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 4. Run Migrations

```bash
php artisan migrate
```

### 5. Build Assets

```bash
npm run build
# or for development:
npm run dev
```

### 6. Start Development Server

```bash
php artisan serve
```

Visit `http://localhost:8000` to access the application.

## Usage

1. **Create Account**: Register a new account
2. **Upload Video**: Add a video file or YouTube URL
3. **Add Elements**: Create interactive elements (text, images, buttons, quizzes)
4. **Position Elements**: Drag elements to desired positions on the video
5. **Preview**: Test your interactive video
6. **Publish**: Share your interactive video


## Technologies Used

- **Backend**: Laravel 10, PHP 8.1+
- **Frontend**: Vue.js 3, Inertia.js, Tailwind CSS
- **Database**: MySQL

## Development

### Running Tests

```bash
php artisan test
```

### Code Style

```bash
./vendor/bin/pint
```

## Support

For issues and questions, please create an issue in the repository.
