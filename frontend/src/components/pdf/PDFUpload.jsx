import { FiUploadCloud, FiFileText } from 'react-icons/fi'
import { Button } from '../ui/Button'

export function PDFUpload({ file, progress, onFileChange, onSubmit, loading }) {
  return (
    <div className="glass-panel rounded-[1.75rem] p-5 md:p-6">
      <label
        htmlFor="pdf-upload"
        className="flex cursor-pointer flex-col items-center justify-center rounded-[1.6rem] border border-dashed border-cyan-400/25 bg-white/4 px-6 py-10 text-center transition hover:border-cyan-300/50 hover:bg-white/6"
      >
        <span className="grid h-14 w-14 place-items-center rounded-3xl bg-cyan-400/10 text-2xl text-cyan-300">
          <FiUploadCloud />
        </span>
        <span className="mt-4 text-lg font-semibold text-white">Drag and drop a PDF or browse</span>
        <span className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
          Upload lecture notes, research papers, or study guides to generate a concise markdown summary.
        </span>
        <input id="pdf-upload" type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
      </label>

      <div className="mt-5 space-y-3">
        {file ? (
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/6 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/8 text-cyan-300">
                <FiFileText />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{file.name}</p>
                <p className="text-xs text-slate-400">{Math.round(file.size / 1024)} KB</p>
              </div>
            </div>
            <Button size="sm" variant="secondary" onClick={onSubmit} loading={loading}>
              Summarize
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-slate-300">
            No file selected yet.
          </div>
        )}

        {progress > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Upload progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}