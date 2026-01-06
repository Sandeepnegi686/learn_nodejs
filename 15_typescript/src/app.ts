type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function getData(url: string): Promise<Todo[]> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network error, status: ${response.status}`);
    }
    const data: Todo[] = (await response.json()) as Todo[];
    return data;
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "there is a error";
    console.log(errMessage);
    return [];
  }
}

const data = getData("https://jsonplaceholder.typicode.com/todos");
// console.log(data);
