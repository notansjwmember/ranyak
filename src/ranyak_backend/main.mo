import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
  type Comment = {
    text: Text;
    time: Time.Time;
  };

  var comments: [Comment] = [];

  public func addComment(text: Text) : async Bool {
    let currentTime = Time.now();  
    let newComment: Comment = {
      text = text;
      time = currentTime;
    };
    comments := Array.append(comments, [newComment]);  
    return true;
  };

  public func getComments() : async [Comment] {
    return comments;
  };

  public func resetComments() : async Bool {
      comments := [];
      return true;
  };
};
