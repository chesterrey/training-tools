import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

import { State as RoutineStateType } from "@/lib/store/routine"

function generateDocDefinition (routine: RoutineStateType["routine"], weeks: number): any {

  return {
  pageSize: "A4",
  pageOrientation: "portrait",

    content: [
      ...Array.from({ length: weeks }, (_, i) => i + 1).map((week) => {
        return [
          {
          text: `Week ${week}`,
          style: "header",
          fontSize: 16,
          bold: true,
        },
          ...routine.days.map((day) => {
            return [
              {
          style: "dayTable",
          table: {
            widths: [200, 100, 100],
            body: [
              [
                {
                  text: day.label,
                  bold: true,
                  colSpan: 3,
                  alignment: "center",
                },
                {},
                {},
              ],
              [
                { text: "Exercise", bold: true, alignment: "center" },
                { text: "Rep range", bold: true, alignment: "center" },
                { text: "Sets", bold: true, alignment: "center" },
              ],
              ...day.exercises
                .filter((exercise) => exercise.id !== "no-exercise")
              .map((exercise) => {
                return [exercise.id.split("$$$")[0], `${exercise.rep_range[0]}-${exercise.rep_range[1]}`, exercise.sets[week === weeks ? exercise.sets.length-1 : week - 1]]
              }),
            ],
          },
          layout: {
            fillColor: function (rowIndex: any, node: any, columnIndex: any) {
              return rowIndex % 2 === 0 ? "#CCCCCC" : null
            },
          },
        },
            ]
          })
        ]

      }),
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 8],
    },
    dayTable: {
      margin: [0, 0, 0, 6],
    },
  },
}
}

export function downloadPDF(routine: RoutineStateType["routine"], weeks: number) {
  const docDefinition = generateDocDefinition(routine, weeks)
  pdfMake.createPdf(docDefinition).open()
}
