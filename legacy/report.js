// Générateur de rapport hebdomadaire – code legacy (exercice 1)
// Ne pas modifier le comportement sans tests !

export function generateReport(tasks, today, options) {
  var out = "";
  var opts = options || {};
  var projects = {};
  var i, t, p, k;

  // regroupement par projet
  for (i = 0; i < tasks.length; i++) {
    t = tasks[i];
    if (opts.project && t.project != opts.project) continue;
    if (!projects[t.project]) {
      projects[t.project] = { name: t.project, total: 0, done: 0, late: [], items: [] };
    }
    p = projects[t.project];
    p.total = p.total + 1;
    if (t.status == "done") p.done = p.done + 1;
    if (t.dueDate && t.dueDate < today) p.late.push(t);
    p.items.push(t);
  }

  var names = Object.keys(projects);
  names.sort();

  if (opts.format == "csv") {
    out = "projet;total;terminees;taux;en_retard\n";
    for (k = 0; k < names.length; k++) {
      p = projects[names[k]];
      out =
        out +
        p.name +
        ";" +
        p.total +
        ";" +
        p.done +
        ";" +
        Math.round((p.done / p.total) * 100) +
        ";" +
        p.late.length +
        "\n";
    }
    return out;
  }

  out = "RAPPORT DU " + today + "\n";
  out = out + "========================\n";
  var allTotal = 0;
  var allDone = 0;
  for (k = 0; k < names.length; k++) {
    p = projects[names[k]];
    allTotal = allTotal + p.total;
    allDone = allDone + p.done;
    out = out + "\n## " + p.name.toUpperCase() + "\n";
    out =
      out +
      "Avancement : " +
      p.done +
      "/" +
      p.total +
      " (" +
      Math.round((p.done / p.total) * 100) +
      "%)\n";
    if (p.late.length > 0) {
      out = out + "En retard :\n";
      p.late.sort(function (a, b) {
        return a.dueDate > b.dueDate ? 1 : -1;
      });
      for (i = 0; i < p.late.length; i++) {
        out = out + "  - " + p.late[i].title + " (échéance " + p.late[i].dueDate + ")\n";
      }
    }
    if (opts.details) {
      out = out + "Tâches :\n";
      for (i = 0; i < p.items.length; i++) {
        var mark =
          p.items[i].status == "done" ? "[x]" : p.items[i].status == "in_progress" ? "[~]" : "[ ]";
        out = out + "  " + mark + " " + p.items[i].title + "\n";
      }
    }
  }
  out =
    out +
    "\nTOTAL : " +
    allDone +
    "/" +
    allTotal +
    " (" +
    Math.round((allDone / allTotal) * 100) +
    "%)\n";
  return out;
}
