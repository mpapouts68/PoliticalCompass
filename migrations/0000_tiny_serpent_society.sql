CREATE TABLE `ideology_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`text_en` text,
	`category` text NOT NULL,
	`left_score` integer NOT NULL,
	`right_score` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ideology_responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`question_id` integer NOT NULL,
	`answer` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`question_id`) REFERENCES `ideology_questions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ideology_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`total_score` real NOT NULL,
	`label` text NOT NULL,
	`percentage` real NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `parties` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`short_name` text NOT NULL,
	`color` text NOT NULL,
	`description` text NOT NULL,
	`ideology` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pm_decisions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`scenario_id` integer NOT NULL,
	`chosen_option_id` integer NOT NULL,
	`decision_time` integer,
	`created_at` integer,
	FOREIGN KEY (`scenario_id`) REFERENCES `pm_scenarios`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chosen_option_id`) REFERENCES `pm_policy_options`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pm_policy_options` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scenario_id` integer NOT NULL,
	`option_text` text NOT NULL,
	`option_text_en` text,
	`political_cost` integer NOT NULL,
	`economic_impact` integer NOT NULL,
	`social_impact` integer NOT NULL,
	`party_alignment` text NOT NULL,
	`consequences` text NOT NULL,
	`consequences_en` text,
	FOREIGN KEY (`scenario_id`) REFERENCES `pm_scenarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pm_scenarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`title_en` text,
	`description` text NOT NULL,
	`description_en` text,
	`context` text NOT NULL,
	`context_en` text,
	`category` text NOT NULL,
	`difficulty` integer NOT NULL,
	`time_pressure` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`text` text NOT NULL,
	`text_en` text,
	`category` text NOT NULL,
	`party_positions` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`question_en` text,
	`correct_answer` text NOT NULL,
	`wrong_answers` text NOT NULL,
	`explanation` text NOT NULL,
	`explanation_en` text,
	`category` text NOT NULL,
	`difficulty` integer NOT NULL,
	`era` text
);
--> statement-breakpoint
CREATE TABLE `quiz_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`question_id` integer NOT NULL,
	`user_answer` text NOT NULL,
	`is_correct` integer NOT NULL,
	`time_taken` integer,
	`created_at` integer,
	FOREIGN KEY (`question_id`) REFERENCES `quiz_questions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `survey_responses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`question_id` integer NOT NULL,
	`answer` integer NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE TABLE `survey_results` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` text NOT NULL,
	`party_alignments` text NOT NULL,
	`question_count` integer NOT NULL,
	`created_at` integer
);
