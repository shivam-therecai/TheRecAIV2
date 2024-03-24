const R13Candidates = new Schema({
    // Candidate fields
    technology: String,
    skill: String,
    experience: String,
    companyName: String,
    roleName: String,
    location: String,
    companyCategory1: String,
    companyCategory2: String,
    companyCategory3: String,
    //what is assign counter
    assignCounter: String,
    r13Name: String,
    
    // Reference R11 requirements
    requirements: { type: Schema.Types.ObjectId, ref: 'R11Requirements' }
  });
  
  module.exports = mongoose.model('R13CandidatesSchema', R13Candidates);