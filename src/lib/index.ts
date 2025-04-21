export interface ExamData {
	exam1: number;
	exam1Quiz: boolean;
	exam2: number;
	exam3: number;
	gatewayAttempts: number;
}

export interface ParticipationData {
	tdqs: number;
	totalTdqs: number;
	participationGrade: number;
}

export interface WebworkScore {
	score: number;
	total: number;
}

export interface WrittenHomeworkScore {
	score: number;
	late: boolean;
}

export interface WinterSummerAssignmentScore {
	score: number;
	possible: number;
	late: boolean;
}