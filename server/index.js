import express from "express";
import pool from "../src/services/db.js";
import cors from "cors";

const app = express();
const PORT = 2901;

app.use(express.json());
app.use(cors());

//Mensagem para teste do servidor
app.get("/", (req, res) => {
  res.json({ message: "All Hour API" });
});

//Mensagem para garantia do servidor rodando
app.listen(PORT, () => {
  console.log(`Tá rodando, na porta ${PORT}`);
});

// --------------------------------- Categorias ------------------------------------------//
//Retorno geral de categories, mostra tudo, usando GET
app.get("/categories", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Retorna apenas os Ids
app.get("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Usando método POST para envio de informações
app.post("/categories", async (req, res) => {
  try {
    const { nome } = req.body;
    const result = await pool.query(
      "INSERT INTO categories (nome) VALUES ($1) RETURNING *",
      [nome],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Atualizando com o método PUT
app.put("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const result = await pool.query(
      "UPDATE categories SET nome = $1 WHERE id = $2 RETURNING *",
      [nome, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Deleta os Ids
app.delete("/categories/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM categories WHERE id = $1", [id]);
    res.json({ message: "Registro deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// --------------------------------- Tasks ------------------------------------------//
//Retorno geral de categories, mostra tudo, usando GET
app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Retorna apenas os Ids
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Usando método POST para envio de informações
app.post("/tasks", async (req, res) => {
  try {
    const { nome, categoria } = req.body;
    const result = await pool.query(
      "INSERT INTO tasks (nome, categoria) VALUES ($1, $2) RETURNING *",
      [nome, categoria],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Atualizando com o método PUT
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoria } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET nome = $1, categoria = $2 WHERE id = $3 RETURNING *",
      [nome, categoria, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Deleta os Ids
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json({ message: "Registro deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { concluida } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET concluida = $1 WHERE id = $2 RETURNING *",
      [concluida, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// --------------------------------- Weekly ------------------------------------------//
//Retorno geral de categories, mostra tudo, usando GET
app.get("/weekly_block", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT weekly_block.id, weekly_block.hora_inicio, weekly_block.hora_fim, weekly_block.dia_semana, categories.nome FROM weekly_block JOIN categories ON categories.id = weekly_block.categoria",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Retorna apenas os Ids
app.get("/weekly_block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM weekly_block WHERE id = $1",
      [id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Usando método POST para envio de informações
app.post("/weekly_block", async (req, res) => {
  try {
    const { categoria, dia_semana, hora_inicio, hora_fim } = req.body;
    const result = await pool.query(
      "INSERT INTO weekly_block (categoria, dia_semana, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4) RETURNING *",
      [categoria, dia_semana, hora_inicio, hora_fim],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Atualizando com o método PUT
app.put("/weekly_block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { categoria } = req.body;
    const result = await pool.query(
      "UPDATE weekly_block SET categoria = $1 WHERE id = $2 RETURNING *",
      [categoria, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Deleta os Ids
app.delete("/weekly_block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM weekly_block WHERE id = $1", [id]);
    res.json({ message: "Registro deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// --------------------------------- Pomodoro Sessions ------------------------------------------//
//Retorno geral de categories, mostra tudo, usando GET
app.get("/pomodoro_sessions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pomodoro_sessions");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Retorna apenas os Ids
app.get("/pomodoro_sessions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM pomodoro_sessions WHERE id = $1",
      [id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Usando método POST para envio de informações
app.post("/pomodoro_sessions", async (req, res) => {
  try {
    const { task_atual, descansos, aconteceu, foco } = req.body;
    const result = await pool.query(
      "INSERT INTO pomodoro_sessions (task_atual, descansos, aconteceu, foco) VALUES ($1, $2, $3, $4) RETURNING *",
      [task_atual, descansos, aconteceu, foco],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Atualizando com o método PUT
app.put("/pomodoro_sessions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task_atual, descansos, aconteceu, foco } = req.body;
    const result = await pool.query(
      "UPDATE pomodoro_sessions SET task_atual = $1, descansos = $2, aconteceu = $3, foco = $4 WHERE id = $5 RETURNING *",
      [task_atual, descansos, aconteceu, foco, id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

//Deleta os Ids
app.delete("/pomodoro_sessions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM pomodoro_sessions WHERE id = $1", [id]);
    res.json({ message: "Registro deletado" });
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});
