import Text "mo:base/Text";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";

actor {
  type Comment = {
    message: Text;
    date: Time.Time;
  };

  var comments = Buffer.Buffer<Comment>(0);

  public func getComments(): async [Comment] {
    return Buffer.toArray(comments);
  };

  public func addComment(message: Text): async Bool {
    let currentTime = Time.now() ;
    let newComment: Comment = {
      message = message;
      date = currentTime;
    };
    comments.add(newComment);
    return true; 
  };

  public func removeComment(index: Nat): async Bool {
    if (index < comments.size()) {
      ignore comments.remove(index);
      return true;
    } else {
      return false;
    }
  };

  public func resetComments(): async Bool {
    comments := Buffer.Buffer<Comment>(0);
    return true;
  }
}
