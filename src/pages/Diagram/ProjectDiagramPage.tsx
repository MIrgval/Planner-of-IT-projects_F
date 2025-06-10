import React, { useState } from "react";
import { Card, Spin, Alert, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Chart } from "react-google-charts";

type GanttTask = {
  id: string;
  name: string;
  resource: string;
  start_date: string; // ISO
  end_date: string;   // ISO
  duration: number | null;
  percent_complete: number;
  dependencies: string | null;
};

const GanttChartPage: React.FC = () => {
  const [data, setData] = useState<GanttTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Загрузка и чтение json файла
  const handleFileChange = (file: File) => {
    setLoading(true);
    setErr(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const json = JSON.parse(content);
        if (!Array.isArray(json)) throw new Error("Ожидается массив задач");
        setData(json);
      } catch (e: any) {
        setErr("Ошибка чтения файла: " + e.message);
      }
      setLoading(false);
    };
    reader.readAsText(file);
    return false; // чтобы анtd не пытался грузить сам
  };

  const chartData = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" }
    ],
    ...data.map(task => [
      task.id,
      task.name,
      task.resource,
      task.start_date ? new Date(task.start_date) : null,
      task.end_date ? new Date(task.end_date) : null,
      task.duration,
      task.percent_complete,
      task.dependencies || null
    ])
  ];

  return (
    <Card title="Диаграмма Ганта (локальный JSON)" style={{ margin: 24 }}>
      <Upload
        beforeUpload={handleFileChange}
        accept=".json"
        showUploadList={false}
        multiple={false}
        maxCount={1}
      >
        <Button icon={<UploadOutlined />}>Загрузить JSON файл с задачами</Button>
      </Upload>

      {loading && <Spin style={{ marginTop: 16 }} />}
      {err && <Alert type="error" message="Ошибка" description={err} style={{ marginTop: 16 }} />}

      {data.length > 0 && !loading && !err && (
        <Chart
          chartType="Gantt"
          width="100%"
          height="500px"
          data={chartData}
          loader={<Spin />}
          rootProps={{ "data-testid": "1" }}
        />
      )}
    </Card>
  );
};

export default GanttChartPage;
