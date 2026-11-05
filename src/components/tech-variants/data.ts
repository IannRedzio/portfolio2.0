import {
  siHtml5, siCss3, siJavascript, siTypescript, siNodedotjs, siExpress, siPostgresql,
  siSequelize, siReact, siAstro, siTailwindcss, siGit, siGithub, siDocker,
} from 'simple-icons';

export const groups = [
  { area: 'Frontend', items: [
    { name: 'React', icon: siReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: siTypescript, color: '#3178C6' },
    { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E' },
    { name: 'Astro', icon: siAstro, color: '#FF5D01' },
    { name: 'Tailwind', icon: siTailwindcss, color: '#06B6D4' },
    { name: 'HTML', icon: siHtml5, color: '#E34F26' },
    { name: 'CSS', icon: siCss3, color: '#1572B6' },
  ]},
  { area: 'Backend', items: [
    { name: 'Node.js', icon: siNodedotjs, color: '#339933' },
    { name: 'Express', icon: siExpress, color: null },
    { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1' },
    { name: 'Sequelize', icon: siSequelize, color: '#52B0E7' },
  ]},
  { area: 'Herramientas', items: [
    { name: 'Git', icon: siGit, color: '#F05032' },
    { name: 'GitHub', icon: siGithub, color: null },
    { name: 'Docker', icon: siDocker, color: '#2496ED' },
  ]},
];
