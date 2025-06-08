import React, { useMemo } from "react";
import { Chart } from "react-google-charts";
import canvasData from "./canvas-data.json";
import styles from "./ProjectDiagramPage.module.css";

// Дата создания проекта (в формате 'дд.мм.гггг')
const PROJECT_START = "01.01.2025";

// Функция для парсинга "дд.мм.гггг" в объект Date
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
}

// Формируем зависимости для задач по edges
function getDependencies(edges: any[]): Record<string, string[]> {
  const depMap: Record<string, string[]> = {};
  edges.forEach((e) => {
    if (!depMap[e.target]) depMap[e.target] = [];
    depMap[e.target].push(e.source);
  });
  return depMap;
}

const ProjectDiagramPage: React.FC = () => {
  // Получаем зависимости между задачами
  const dependenciesMap = useMemo(
    () => getDependencies(canvasData.edges),
    []
  );

  // Генерируем данные для Google Gantt Chart
  const data = useMemo(() => {
    const ganttData: any[] = [
      [
        "Task ID",
        "Task Name",
        "Resource",
        "Start Date",
        "End Date",
        "Duration",
        "Percent Complete",
        "Dependencies",
      ],
    ];

    // Для поиска стартовой даты первой задачи
    const firstTask = canvasData.nodes.find((n: any) => n.id === "1");
    const projectStartDate = firstTask
      ? parseDate(PROJECT_START)
      : new Date();

    for (const node of canvasData.nodes) {
      if (node.type !== "task") continue;
      const d = node.data;

      // Для первой задачи используем дату создания проекта
      const start =
        d.id === "1" ? projectStartDate : parseDate(d.task_duration);
      // Для примера: окончание = старт + 2 дня
      const end = new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000);

      // Прогресс по статусу
      let percent = 0;
      if (d.status === "completed") percent = 100;
      else if (d.status === "in_progress") percent = 50;
      else if (d.status === "overdue") percent = 80;
      else percent = 0;

      ganttData.push([
        d.id,
        d.name,
        d.teg_id,
        start,
        end,
        null,
        percent,
        (dependenciesMap[d.id] || []).join(","),
      ]);
    }

    // DEBUG (можно убрать):
    // console.log("DATA ДЛЯ ГАНТА", ganttData);

    return ganttData;
  }, [dependenciesMap]);

  const options = {
    height: 500,
    gantt: {
      trackHeight: 50,
      labelStyle: {
        fontName: "Roboto",
        fontSize: 14,
      },
    },
  };

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2>Диаграмма Ганта (Google Charts)</h2>
      </header>
      <div>
        <Chart
          chartType="Gantt"
          width="100%"
          height="500px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default ProjectDiagramPage;
