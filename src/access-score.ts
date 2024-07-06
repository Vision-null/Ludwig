import { getDocument } from './logicCompiler';

export default function getAccessScore(recs: any): { x: string; y: number }[] {
  const document = getDocument();
  

  const totalElements: number = document.querySelectorAll('*').length;
  console.log(totalElements);

  const inaccessibleCount: number = Object.keys(recs).length;

  const accessibleCount: number = totalElements - inaccessibleCount;

  return [
    { x: 'Accessible', y: accessibleCount },
    { x: 'Inaccessible', y: inaccessibleCount },
  ];
}
