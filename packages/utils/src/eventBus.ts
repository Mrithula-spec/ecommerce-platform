type Handler = (data: any) => void;

class EventBus {
  private events = new Map<string, Handler[]>();

  on(event: string, handler: Handler) {
    this.events.set(event, [...(this.events.get(event) || []), handler]);
  }

  emit(event: string, data: any) {
    (this.events.get(event) || []).forEach(h => h(data));
  }
}

export const eventBus = new EventBus();
