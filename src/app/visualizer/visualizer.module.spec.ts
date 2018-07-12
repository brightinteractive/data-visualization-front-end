import { VisualizerModule } from './visualizer.module';

describe('VisualizerModule', () => {
  let visualizerModule: VisualizerModule;

  beforeEach(() => {
    visualizerModule = new VisualizerModule();
  });

  it('should create an instance', () => {
    expect(visualizerModule).toBeTruthy();
  });
});
