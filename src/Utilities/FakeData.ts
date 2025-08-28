import { faker } from "@faker-js/faker";
import {priority, statusEnum, role} from "../Types&Enums/Enums";

// Function to generate a fake user
export const generateFakeUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
});

// Function to generate multiple users
export const generateFakeUsers = (count: number) => {
  return Array.from({ length: count }, () => generateFakeUser());
};

export const generateFakeTask = (existingTaskIds: Set<number>, totalTasks: number) => {
  let task_id;

  // Ensure the task_id is unique
  do {
    task_id = faker.number.int({ min: 1, max: totalTasks });
  } while (existingTaskIds.has(task_id)); // If task_id already exists, generate a new one

  // Add the generated task_id to the set
  existingTaskIds.add(task_id);

  return {
    id: task_id,
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    progress: faker.number.int({ min: 0, max: 100 }),
    user_id: faker.number.int({ min: 1, max: 5 }),
    project_id: faker.number.int({ min: 1, max: 5 }),
    priority: faker.helpers.enumValue(priority),
    status: faker.helpers.enumValue(statusEnum),
    start_date: faker.date.past(),
    end_date: faker.date.future(),
  };
};

// Function to generate multiple tasks
export const generateFakeTasks = (count: number) => {
  const existingTaskIds = new Set<number>(); // Set to track generated task_ids
  return Array.from({ length: count }, () => generateFakeTask(existingTaskIds, count));
};

export const generateFakeProject = (existingProjectIds: Set<number>, totalProjects: number) => {
  let project_id;

  // Ensure the task_id is unique
  do {
    project_id = faker.number.int({ min: 1, max: totalProjects });
  } while (existingProjectIds.has(project_id)); // If task_id already exists, generate a new one

  // Add the generated task_id to the set
  existingProjectIds.add(project_id);

  return {
    id: project_id,
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    progress: faker.number.int({ min: 0, max: 100 }),
    user_id: faker.number.int({ min: 1, max: 5 }),
    status: faker.helpers.enumValue(statusEnum),
    start_date: faker.date.past(),
    end_date: faker.date.future(),
  };
};

// Function to generate multiple tasks
export const generateFakeProjects = (count: number) => {
  const existingProjectIds = new Set<number>(); // Set to track generated task_ids
  return Array.from({ length: count }, () => generateFakeProject(existingProjectIds, count));
};

export const generateFakeComment = (existingCommentIds: Set<number>, totalComments: number) => {
  let id;

  do{
    id = faker.number.int({min:1, max: totalComments});
  } while (existingCommentIds.has(id));

  existingCommentIds.add(id);

  return {
    id,
    comment: faker.lorem.sentence(),
  }
}

export const generateFakeComments = (count: number) => {
  const existingCommentIds = new Set<number>();
  return Array.from({length: count}, () => generateFakeComment(existingCommentIds, count));
}

export const generateFakeTag = (existingTagIds: Set<number>, totalTags: number) => {
  let tag_id;

  do{
    tag_id = faker.number.int({min:1, max: totalTags});
  } while (existingTagIds.has(tag_id));

  existingTagIds.add(tag_id);

  return {
    id: tag_id,
    title: faker.lorem.words(1),
  }
}

export const generateFakeTags = (count: number) => {
  const existingTagIds = new Set<number>();
  return Array.from({length: count}, () => generateFakeTag(existingTagIds, count));
}