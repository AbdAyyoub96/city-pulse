export function WorkPreview({ kind }: { kind: string }) {
  return (
    <div className={`work-art work-art-${kind}`} aria-hidden="true">
      <div className="mock-window">
        <div className="mock-top">
          <i />
          <i />
          <i />
          <span />
        </div>
        <div className="mock-content">
          <div className="mock-sidebar">
            <i />
            <i />
            <i />
          </div>
          <div className="mock-body">
            <span />
            <span />
            <div className="mock-blocks">
              <i />
              <i />
              <i />
            </div>
            <div className="mock-line" />
          </div>
        </div>
      </div>
    </div>
  );
}
