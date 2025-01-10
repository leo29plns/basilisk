export class ScoreManager {
  private readonly score: number;

  constructor(score: number = 0) {
    this.score = score;
  }

  public getBestScore(): number {
    const bestScore = this.getStoredScore('bestScore');
    
    if (bestScore === null || bestScore < this.score) {
      this.saveScore('bestScore', this.score);
      return this.score;
    }

    return bestScore;
  }

  public getWorstScore(): number {
    const worstScore = this.getStoredScore('worstScore');

    if (worstScore === null || worstScore > this.score) {
      this.saveScore('worstScore', this.score);
      return this.score;
    }

    return worstScore;
  }

  private getStoredScore(key: string): number | null {
    const score = window.localStorage.getItem(key);
    return score ? JSON.parse(score) : null;
  }

  private saveScore(key: string, score: number): void {
    window.localStorage.setItem(key, JSON.stringify(score));
  }
}
