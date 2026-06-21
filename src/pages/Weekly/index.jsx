import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories.services";
import {
  createWeekly,
  deleteWeekly,
  getWeekly,
} from "../../services/weekly.services";
import styles from "./styles.module.css";

export function Weekly() {
  const [categories, setCategories] = useState([]);
  const [block, setBlock] = useState([]);
  const dias = [0, 1, 2, 3, 4, 5, 6];
  const nomesDias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const [showModal, setShowModal] = useState(false);
  const [modalCategoria, setModalCategoria] = useState("1");
  const [modalInicio, setModalInicio] = useState("");
  const [modalFim, setModalFim] = useState("");
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const hoje = new Date().getDay();

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const data = await getWeekly();
      setBlock(data);
    }
    load();
  }, []);

  async function handleAddBlock() {
    await createWeekly({
      categoria: modalCategoria,
      hora_inicio: modalInicio,
      hora_fim: modalFim,
      dia_semana: diaSelecionado,
    });
    const data = await getWeekly();
    setBlock(data);
    setShowModal(false);
    setModalCategoria("1");
    setModalInicio("");
    setModalFim("");
  }

  async function handleDeleteBlock(id) {
    await deleteWeekly(id);
    setBlock(block.filter((b) => b.id !== id));
  }

  function getSemanaAtual() {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const seg = new Date(hoje);
    const opcoes = { day: "2-digit", month: "short" };
    seg.setDate(hoje.getDate() - ((diaSemana + 6) % 7));
    const dom = new Date(seg);
    dom.setDate(seg.getDate() + 6);
    const strSeg = seg.toLocaleDateString("pt-BR", opcoes);
    const strDom = dom.toLocaleDateString("pt-BR", opcoes);
    return `${strSeg} — ${strDom} · ${seg.getFullYear()}`;
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          Weekly <em>Planner</em>
        </h1>
        <p className={styles.pageSub}>{getSemanaAtual()}</p>
      </div>

      <div className={styles.weekGrid}>
        {dias.map((dia) => (
          <div key={dia} className={styles.dayCol}>
            <span
              className={`${styles.dayLabel} ${dia === hoje ? styles.dayLabelToday : ""}`}
            >
              {nomesDias[dia]}
            </span>
            {block
              .filter((b) => b.dia_semana === dia)
              .map((b) => (
                <div key={b.id} className={styles.block}>
                  <div className={styles.blockHeader}>
                    <span className={styles.blockName}>{b.nome}</span>
                    <button
                      className={styles.blockDel}
                      onClick={() => handleDeleteBlock(b.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <span className={styles.blockTime}>
                    {b.hora_inicio.slice(0, 5)} – {b.hora_fim.slice(0, 5)}
                  </span>
                </div>
              ))}
            <button
              className={styles.addBlock}
              onClick={() => {
                setShowModal(true);
                setDiaSelecionado(dia);
              }}
            >
              +
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalTitle}>Novo bloco</p>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Categoria</label>
              <select
                className={styles.modalSelect}
                value={modalCategoria}
                onChange={(e) => setModalCategoria(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Início</label>
              <input
                className={styles.modalInput}
                type="time"
                value={modalInicio}
                onChange={(e) => setModalInicio(e.target.value)}
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Fim</label>
              <input
                className={styles.modalInput}
                type="time"
                value={modalFim}
                onChange={(e) => setModalFim(e.target.value)}
              />
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.btnCancel}
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button className={styles.btnConfirm} onClick={handleAddBlock}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
